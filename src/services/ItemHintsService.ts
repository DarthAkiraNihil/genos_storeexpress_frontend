import { ItemType } from "models/items";

export enum ItemHintType {
    Number,
    Boolean,
    String,
    List,
    ForeignKeyName,
    ForeignKeyModel,
    ForeignKeyList
}

export interface ItemHint {
    key: string,
    name: string,
    type: ItemHintType,
}

class ItemHintsService {

    public getHints(itemType: ItemType): ItemHint[] {
        switch (itemType) {
            case ItemType.ComputerCase: {
                return this.getHintsComputerCase();
            }

            case ItemType.CPU: {
                return this.getHintsCPU();
            }

            case ItemType.CPUCooler: {
                return this.getHintsCPUCooler();
            }

            case ItemType.Display: {
                return this.getHintsDisplay();
            }

            case ItemType.GraphicsCard: {
                return this.getHintsGraphicsCard();
            }

            case ItemType.HDD: {
                return this.getHintsHDD();
            }

            case ItemType.Keyboard: {
                return this.getHintsKeyboard();
            }

            case ItemType.Motherboard: {
                return this.getHintsMotherboard();
            }

            case ItemType.Mouse: {
                return this.getHintsMouse();
            }

            case ItemType.NVMeSSD: {
                return this.getHintsNVMeSSD();
            }

            case ItemType.PowerSupply: {
                return this.getHintsPowerSupply();
            }

            case ItemType.RAM: {
                return this.getHintsRAM();
            }

            case ItemType.SataSSD: {
                return this.getHintsSataSSD();
            }

            case ItemType.PreparedAssembly: {
                return this.getHintsPreparedAssembly();
            }
        }
    }

    private getHintsComputerCase(): ItemHint[] {
        return [
            { name: "Типоразмер", key: "typesize", type: ItemHintType.ForeignKeyName},
            { name: "Длина", key: "length", type: ItemHintType.Number},
            { name: "Ширина", key: "width", type: ItemHintType.Number},
            { name: "Высота", key: "height", type: ItemHintType.Number},
            { name: "Поддерживаемые форм-факторы материнских плат", key: "supported_motherboard_form_factors", type: ItemHintType.ForeignKeyList},
            { name: "Наличие ARGB подсветки", key: "has_argb_lighting", type: ItemHintType.Boolean},
            { name: "Количество слотов под",  key: "drives_slots_count", type: ItemHintType.Number},
        ];
    }

    private getHintsCPU(): ItemHint[] {
        return [
            { name: "Сокет", key: "socket", type: ItemHintType.ForeignKeyName},
            { name: "Количество ядер", key: "cores_count", type: ItemHintType.Number},
            { name: "Количество потоков", key: "threads_count", type: ItemHintType.Number},
            { name: "Размер кэша L2 ", key: "l2_cache_size", type: ItemHintType.Number},
            { name: "Размер кэша L3 ", key: "l3_cache_size", type: ItemHintType.Number},
            { name: "Техпроцесс", key: "technical_process", type: ItemHintType.Number},
            { name: "Базовая частота", key: "base_frequency", type: ItemHintType.Number},
            { name: "Поддерживаемый объём ОЗУ ", key: "supported_ram_size", type: ItemHintType.Number},
            { name: "Наличие интегрированной графики ", key: "has_integrated_graphics", type: ItemHintType.Boolean},
            { name: "Поддерживаемые типы ОЗУ ", key: "supported_ram_types", type: ItemHintType.ForeignKeyList},
            { name: "Ядро", key: "core", type: ItemHintType.ForeignKeyModel},
        ];
    }

    private getHintsCPUCooler(): ItemHint[] {
        return [
            { name: "Максимальная скорость оборота", key: "max_fan_rpm", type:ItemHintType.Number },
            { name: "Количество трубок", key: "tubes_count", type: ItemHintType.Number},
            { name: "Диаметр трубок", key: "tubes_diameter", type: ItemHintType.Number},
            { name: "Количество вентиляторов", key: "fan_count", type: ItemHintType.Number},
            { name: "Материал основания", key: "foundation_material", type: ItemHintType.ForeignKeyName},
            { name: "Материал радиатора", key: "raditor_material", type: ItemHintType.ForeignKeyName},
        ];
    }

    private getHintsDisplay(): ItemHint[] {
        return [
            { name: "Максимальная частота обновления ", key: "max_update_frequency", type: ItemHintType.Number},
            { name: "Диагональ экрана", key: "screen_diagonal", type: ItemHintType.Number},
            { name: "Тип матрицы", key: "matrix_type", type: ItemHintType.ForeignKeyName},
            { name: "Тип подсветки", key: "underlight", type: ItemHintType.ForeignKeyName},
            { name: "Размер Vesa", key: "vesa_size", type: ItemHintType.ForeignKeyName},
            { name: "Разрешение экрана", key: "definition", type: ItemHintType.ForeignKeyName},
        ];
    }

    private getHintsGraphicsCard(): ItemHint[] {
        return [
            { name: "Видеопамять", key: "video_ram", type: ItemHintType.Number},
            { name: "Максимальное число мониторов ", key: "max_displays_supported", type: ItemHintType.Number},
            { name: "Коилчество занимаемых слотов ", key: "used_slots", type: ItemHintType.Number},
            { name: "Видеопорты", key: "video_ports", type: ItemHintType.ForeignKeyList},
            { name: "Графическое ядро", key: "gpu", type: ItemHintType.ForeignKeyModel},
        ];
    }

    private getHintsHDD(): ItemHint[] {
        return [
            { name: "Ёмкость", key: "capacity", type: ItemHintType.Number},
            { name: "Скорость чтения", key: "read_speed", type: ItemHintType.Number},
            { name: "Скорость записи", key: "write_speed", type: ItemHintType.Number},
            { name: "Скорость оборота шпинделя ", key: "rpm", type: ItemHintType.Number},
        ];
    }

    private getHintsKeyboard(): ItemHint[] {
        return [
            { name: "Наличие RGB подсветки ", key: "has_rgb_lighting", type: ItemHintType.Boolean},
            { name: "Беспроводная", key: "is_wireless", type: ItemHintType.Boolean},
            { name: "Типоразмер", key: "typesize", type: ItemHintType.ForeignKeyName},
            { name: "Тип", key: "type", type: ItemHintType.ForeignKeyName},
        ];
    }

    private getHintsMotherboard(): ItemHint[] {
        return [
            { name: "Количество слотов ОЗУ", key: "ram_slots", type: ItemHintType.Number},
            { name: "Количество каналов ОЗУ", key: "ram_channels", type: ItemHintType.Number},
            { name: "Максимальная частота ОЗУ", key: "max_ram_frequency", type: ItemHintType.Number},
            { name: "Количество слотов PCI", key: "pcie_slots_count", type: ItemHintType.Number},
            { name: "Наличие поддержки NVMe ", key: "has_nvme_support", type: ItemHintType.Boolean},
            { name: "Количество слотов M2 ", key: "m2_slots_count", type: ItemHintType.Number},
            { name: "Количество портов Sata ", key: "sata_ports_count", type: ItemHintType.Number},
            { name: "Количество портов USB ", key: "usb_ports_count", type: ItemHintType.Number},
            { name: "Количество портов RJ-45", key: "rj45_ports_count", type: ItemHintType.Number},
            { name: "Количество цифровых аудиопортов", key: "digital_audio_ports_count", type: ItemHintType.Number},
            { name: "Скорость сетевого адаптера", key: "network_adapter_speed", type: ItemHintType.Number},
            { name: "Форм-фактор ", key: "form_factor", type: ItemHintType.ForeignKeyName},
            { name: "Сокет процессора", key: "cpu_socket", type: ItemHintType.ForeignKeyModel },
            { name: "Версия PCI-e", key: "pcie_version", type: ItemHintType.ForeignKeyName},
            { name: "Поддерживаемые типы ОЗУ ", key: "supported_ram_types", type: ItemHintType.ForeignKeyList},
            { name: "Видеопорты", key: "video_ports", type: ItemHintType.ForeignKeyList},
            { name: "Поддерживаемые ядра процессоров", key: "supported_cpu_cores", type: ItemHintType.ForeignKeyList},
            { name: "Чипсет", key: "motherboard_chipset", type: ItemHintType.ForeignKeyModel},
            { name: "Аудиочипсет", key: "audio_chipset", type: ItemHintType.ForeignKeyModel},
            { name: "Сетевой адаптер", key: "network_adapter", type: ItemHintType.ForeignKeyModel},
        ];
    }

    private getHintsMouse(): ItemHint[] {
        return [
            { name: "Количество кнопок", key: "buttons_count", type: ItemHintType.Number},
            { name: "Наличие программируемых кнопок ", key: "has_programmable_buttons", type: ItemHintType.Boolean},
            { name: "Беспроводная", key: "is_wireless", type: ItemHintType.Boolean},
            { name: "Режимы работы DPI ", key: "dpi_modes", type: ItemHintType.ForeignKeyList},
        ];
    }

    private getHintsNVMeSSD(): ItemHint[] {
        return [
            { name: "Ёмкость", key: "capacity", type: ItemHintType.Number},
            { name: "Скорость чтения", key: "read_speed", type: ItemHintType.Number},
            { name: "Скорость записи", key: "write_speed", type: ItemHintType.Number},
            { name: "TBW", key: "tbw", type: ItemHintType.Number},
            { name: "DWPD", key: "dwpd", type: ItemHintType.Number},
            { name: "Количество бит на ячейку",  key: "bits_for_cell", type: ItemHintType.Number},
            { name: "Контроллер", key: "controller", type: ItemHintType.ForeignKeyModel},
        ];
    }

    private getHintsPowerSupply(): ItemHint[] {
        return [
            { name: "Выходная мощность", key: "power_output", type: ItemHintType.Number},
            { name: "Количество портов Sata ", key: "sata_ports", type: ItemHintType.Number},
            { name: "Количество портов Molex ", key: "molex_ports", type: ItemHintType.Number},
            { name: "Сертификат 80Plus", key: "certificate_80plus", type: ItemHintType.ForeignKeyName},
        ];
    }

    private getHintsRAM(): ItemHint[] {
        return [
            { name: "Общий объём", key: "total_size", type: ItemHintType.Number},
            { name: "Объём одноного модуля ", key: "module_size", type: ItemHintType.Number},
            { name: "Количество модулей", key: "modules_count", type: ItemHintType.Number},
            { name: "Частота", key: "frequency", type: ItemHintType.Number},
            { name: "Тайминг cl", key: "cl", type: ItemHintType.Number},
            { name: "Тайминг tRCD", key: "trcd", type: ItemHintType.Number},
            { name: "Тайминг tRP", key: "trp", type: ItemHintType.Number},
            { name: "Тайминг tRAS", key: "tras", type: ItemHintType.Number},
            { name: "Тип", key: "type", type: ItemHintType.ForeignKeyName},
        ];
    }

    private getHintsSataSSD(): ItemHint[] {
        return [
            { name: "Ёмкость", key: "capacity", type: ItemHintType.Number},
            { name: "Скорость чтения", key: "read_speed", type: ItemHintType.Number},
            { name: "Скорость записи", key: "write_speed", type: ItemHintType.Number},
            { name: "TBW", key: "tbw", type:ItemHintType.Number },
            { name: "DWPD", key: "dwpd", type: ItemHintType.Number},
            { name: "Количество бит на ячейку", key: "bits_for_cell", type: ItemHintType.Number},
            { name: "Контроллер", key: "controller", type: ItemHintType.ForeignKeyModel}
        ];
    }

    private getHintsPreparedAssembly(): ItemHint[] {
        return [
            { name: "ОЗУ", key: "rams", type: ItemHintType.ForeignKeyModel},
            { name: "Дисковые накопители", key: "disk_drives", type: ItemHintType.ForeignKeyList},
            { name: "Центральный процессор", key: "cpu", type: ItemHintType.ForeignKeyModel},
            { name: "Материнская плата", key: "motherboard", type: ItemHintType.ForeignKeyModel},
            { name: "Видеокарта", key: "graphics_card", type: ItemHintType.ForeignKeyModel},
            { name: "Блок питания", key: "power_supply", type: ItemHintType.ForeignKeyModel},
            { name: "Монитор", key: "display", type: ItemHintType.ForeignKeyModel},
            { name: "Корпус", key: "computer_case", type: ItemHintType.ForeignKeyModel},
            { name: "Клавиатура", key: "keyboard", type: ItemHintType.ForeignKeyModel},
            { name: "Мышь", key: "mouse", type: ItemHintType.ForeignKeyModel},
            { name: "Кулер для процессора", key: "cpu_cooler", type: ItemHintType.ForeignKeyModel},
        ];
    }

}

export const ItemHints = new ItemHintsService();
