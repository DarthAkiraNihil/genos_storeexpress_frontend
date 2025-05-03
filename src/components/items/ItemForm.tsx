import React, { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { ItemType } from "models/items/ItemType";
import { ItemContext } from "context/ItemContext";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import Typography from "@mui/material/Typography";
import {Button, Grid, MenuItem, Select, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {BankSystem, Discount} from "../../models/orders";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {DetailedItem, Review} from "../../models/items";
import {useAuth} from "../../context";


interface NewItem {
    name: string;
    model: string;
    price: number;
    description: string;
    item_type: ItemType;
    characteristics: string;
};

interface ItemFormProps {
    item: DetailedItem | null;
    type: ItemType;
    edit: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ( { item, edit, type }) => {

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
    const [error, setError] = useState<string>("");

    const [currentItem, setCurrentItem] = useState<DetailedItem>(item ?? emptyItem);
    const [currentCharacteristics, setCurrentCharacteristics] = useState<string>(item !== null ? JSON.stringify(item.characteristics, null, 4) : "");

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

            if (edit) {
                context.updateItem(currentItem.id, currentItem, token!).then(() => {
                    setLoading(false);
                })
            } else {
                context.createItem(currentItem, token!).then(() => {
                    setLoading(false);
                    setCurrentItem(emptyItem);
                })
            }
        }
    }


    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}
        >
            <Grid size={6}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Typography variant="h6" component="h2" mb={3}>
                            {
                                edit ? `Редактирование товара ${currentItem.name}` : `Создание нового товара типа ${type}`
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
                        <TextField
                            label="Цена"
                            type={"number"}
                            value={currentItem.price}
                            onChange={(e) => {
                                setCurrentItem({ ...currentItem, price: parseInt(e.target.value || "", 10) })
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
                                setCurrentItem({ ...currentItem, description: e.target.value })
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

                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size={20} /> : null}
                            fullWidth
                            sx={{
                                paddingTop: '8px',
                                paddingBottom: '8px'
                            }}
                        >
                            {edit ? loading ? "Применение изменений..." : "Применить изменения" : loading ? "Активация..." : "Активировать скидку" }
                        </Button>
                    </Stack>
                </form>
            </Grid>
        </Grid>
    )
}
