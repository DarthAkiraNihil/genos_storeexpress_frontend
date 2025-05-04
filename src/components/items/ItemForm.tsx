import React, { useState, useContext, ChangeEvent } from "react"
import { useNavigate } from "react-router"
import { ItemType } from "models/items/ItemType";
import { ItemContext } from "context/ItemContext";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import Typography from "@mui/material/Typography";
import {Button, Grid, Modal, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {DetailedItem} from "../../models/items";
import {useAuth} from "../../context";
import {ItemTypeNames} from "../../const";
import Box from "@mui/material/Box";
import { ItemHints, ItemHintType } from "services/ItemHintsService";


interface ItemFormProps {
    item: DetailedItem | null;
    type: ItemType;
    edit: boolean;
    backLink: string;
}

export const ItemForm: React.FC<ItemFormProps> = ( { item, edit, type, backLink }) => {

    const emptyItem = {
        id: 0,
        name: "",
        model: "",
        description: "",
        price: 0,
        item_type : type,
        is_in_cart: false,
        left_review: null,
        overall_rating: 0,
        reviews_count: 0,
        active_discount: null,
        characteristics: {}
    }

    const { token } = useAuth()

    const context = useContext(ItemContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [hintsModalOpen, setHintsModalOpen] = useState(false)
    const [error, setError] = useState<string>("");

    const [currentItem, setCurrentItem] = useState<DetailedItem>(item ?? emptyItem);
    const [currentCharacteristics, setCurrentCharacteristics] = useState<string>(item !== null ? JSON.stringify(item.characteristics, null, 4) : "");
    const [imageToSend, setImageToSend] = useState<FormData>();

    const handleOnEditorChange = (value: string, _: any) => {
        setCurrentCharacteristics(value);
        try {
            currentItem.characteristics = JSON.parse(value);
        } catch {
            // ...
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()


        if (!currentItem.name.trim() || !currentItem.model.trim() || !currentItem.description.trim() || currentItem.price === 0.0) {
            setError("Обязательные для всех товаров поля не заполнены");
            return;
        }

        if (context) {

            setLoading(true);

            try {
                if (edit) {
                    context.updateItem(currentItem.id, currentItem, token!)
                        .then(() => {
                            if (imageToSend) {
                                context.setImage(currentItem.id, imageToSend, token!)
                            }
                        })
                        .then(() => {
                            setLoading(false);
                        })
                } else {
                    context.createItem(currentItem, token!).then((response) => {
                        if (imageToSend) {
                            context.setImage(response.id, imageToSend, token!)
                        }
                    }).then(() => {
                        setLoading(false);
                        setCurrentItem(emptyItem);
                    })
                }
            } catch {
                setError("Что-то пошло не так");
            }
        }
    }

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', file);
            setImageToSend(formData);
        }
    }


    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            marginBottom={8}
            sx={{ minHeight: '80vh' }}
        >
            <Grid size={6}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Typography variant="h6" component="h2" mb={3}>
                            {
                                edit ? `Редактирование товара ${currentItem.name}` : `Создание нового товара типа ${ItemTypeNames.get(type)!}`
                            }
                        </Typography>
                        <TextField
                            label="Название"
                            value={currentItem.name}
                            onChange={(e) => {
                                setCurrentItem({...currentItem, name: e.target.value});
                            }}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Модель"
                            value={currentItem.model}
                            onChange={(e) => {
                                setCurrentItem({...currentItem, model: e.target.value});
                            }}
                            required
                            fullWidth
                        />

                        <Grid container spacing={4}>
                            <Grid size={6}>
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Выберите изображение
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleChangeFile}/>
                                </Button>
                            </Grid>
                            <Grid size={6}>
                                {
                                    imageToSend ? `Выбранное изображение: ${(imageToSend.get("file")! as File).name}` : "Изображение не выбрано"
                                }
                            </Grid>
                        </Grid>

                        <TextField
                            label="Цена"
                            type={"number"}
                            value={currentItem.price}
                            onChange={(e) => {
                                setCurrentItem({...currentItem, price: parseInt(e.target.value || "", 10)})
                            }}
                            required
                            fullWidth
                        />

                        <TextField
                            placeholder="Описание"
                            multiline
                            rows={8}
                            value={currentItem.description}
                            onChange={(e) => {
                                setCurrentItem({...currentItem, description: e.target.value})
                            }}
                            required
                            fullWidth
                        />
                        <div>
                            <Typography variant="h6" aria-label={`header_characteristics`}>
                                Характеристики
                            </Typography>
                            <AceEditor
                                mode="json"
                                theme="github"
                                value={currentCharacteristics}
                                onChange={handleOnEditorChange}
                                name="item_characterisitcs_json"
                                width={'100%'}
                                wrapEnabled={true}
                                setOptions={{
                                    useWorker: false
                                }}
                            />
                        </div>

                        <div>
                            {error && <Typography color="error">{error}</Typography>}
                        </div>
                        <Grid container spacing={4} sx={{
                            marginTop: '32px',
                            marginBottom: '32px',
                        }}>
                            <Grid size={4}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    endIcon={loading ? <CircularProgress size={20}/> : null}
                                    fullWidth
                                    sx={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px'
                                    }}
                                >
                                    {edit ? loading ? "Применение изменений..." : "Применить изменения" : loading ? "Добавление..." : "Добавить товар"}
                                </Button>
                            </Grid>
                            <Grid size={4}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px'
                                    }}
                                    onClick={() => {
                                        setHintsModalOpen(true)
                                    }}
                                >
                                    Подсказки по характеристикам
                                </Button>
                            </Grid>
                            <Grid size={4}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        paddingTop: '8px',
                                        paddingBottom: '8px'
                                    }}
                                    onClick={() => {
                                        navigate(backLink);
                                    }}
                                >
                                    Назад к списку товаров
                                </Button>
                            </Grid>
                        </Grid>
                        <Modal
                            open={hintsModalOpen}
                            onClose={() => {
                                setHintsModalOpen(false)
                            }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '90%',
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Подсказки по характеристикам
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Характеристики представляют собой JSON-объект со следующими ключами (также всем неявно может требоваться число tdp):
                                </Typography>
                                {
                                    ItemHints.getHints(type).map((hint) => {
                                        switch (hint.type) {
                                            case ItemHintType.Number: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: число`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            case ItemHintType.Boolean: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: булево`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            case ItemHintType.String: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: строка`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            case ItemHintType.List: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: список (обычно строк)`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            case ItemHintType.ForeignKeyName: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: строка-ссылка на внешнюю сущность по имени`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            case ItemHintType.ForeignKeyModel: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: строка-ссылка на внешнюю сущность по модели`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            case ItemHintType.ForeignKeyList: {
                                                return (
                                                    <Typography sx={{ mt: 2 }}>
                                                        {
                                                            `Характеристика: ${hint.name}. Ключ: ${hint.key}. Тип: список строка-ссылка на внешние сущности (обычно по имени)`
                                                        }
                                                    </Typography>
                                                )
                                            }
                                            default: {
                                                return <div />
                                            }
                                        }
                                    })
                                }
                            </Box>
                        </Modal>
                    </Stack>
                </form>
            </Grid>
        </Grid>
    )
}
