import { Characteristics } from "../models/items/DetailedItem";
import { ItemType } from "../models/items/ItemType";

class ItemCharacteristicsNameMapperService {

    public mapCharacteristics(itemType: ItemType, characteristics: Characteristics): Map<string, any> {
        switch (itemType) {
            case ItemType.ComputerCase: {
                return this.mapComputerCase(characteristics);
            }

            case ItemType.CPU: {
                return this.mapCPU(characteristics);
            }

            case ItemType.CPUCooler: {
                return this.mapCPUCooler(characteristics);
            }

            case ItemType.Display: {
                return this.mapDisplay(characteristics);
            }

            case ItemType.GraphicsCard: {
                return this.mapGraphicsCard(characteristics);
            }

            case ItemType.HDD: {
                return this.mapHDD(characteristics);
            }

            case ItemType.Keyboard: {
                return this.mapKeyboard(characteristics);
            }

            case ItemType.Motherboard: {
                return this.mapMotherboard(characteristics);
            }

            case ItemType.Mouse: {
                return this.mapMouse(characteristics);
            }

            case ItemType.NVMeSSD: {    
                return this.mapNVMeSSD(characteristics);
            }

            case ItemType.PowerSupply: {
                return this.mapPowerSupply(characteristics);
            }

            case ItemType.RAM: {
                return this.mapRAM(characteristics);
            }

            case ItemType.SataSSD: {
                return this.mapSataSSD(characteristics);
            }

            case ItemType.PreparedAssembly: {
                return this.mapPreparedAssembly(characteristics);
            }
        }
    }

    private mapComputerCase(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Типоразмер", characteristics["typesize"]],
            ["Длина", characteristics["length"]],
            ["Ширина", characteristics["width"]],
            ["Высота", characteristics["height"]],
            ["Поддерживаемые форм-факторы материнских плат", characteristics["supported_motherboard_form_factors"]],
            ["Наличие ARGB подсветки", characteristics["has_argb_lighting"]],
            ["Количество слотов под диски", characteristics["drives_slots_count"]],
        ]);
    }

    private mapCPU(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Сокет", characteristics["socket"]],
            ["Количество ядер", characteristics["cores_count"]],
            ["Количество потоков", characteristics["threads_count"]],
            ["Размер кэша L2", characteristics["l2_cache_size"]],
            ["Размер кэша L3", characteristics["l3_cache_size"]],
            ["Техпроцесс", characteristics["technical_process"]],
            ["Базовая частота", characteristics["base_frequency"]],
            ["Поддерживаемый объём ОЗУ", characteristics["supported_ram_size"]],
            ["Наличие интегрированной графики", characteristics["has_integrated_graphics"]],
            ["Поддерживаемые типы ОЗУ", characteristics["supported_ram_types"]],
            ["Ядро", characteristics["core"]["model"]],
        ]);
    }

    private mapCPUCooler(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Максимальная скорость оборота вентилятора", characteristics["max_fan_rpm"]],
            ["Количество трубок", characteristics["tubes_count"]],
            ["Диаметр трубок", characteristics["tubes_diameter"]],
            ["Количество вентиляторов", characteristics["fan_count"]],
            ["Материал основания", characteristics["foundation_material"]],
            ["Материал радиатора", characteristics["raditor_material"]],
        ]);
    }

    private mapDisplay(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Максимальная частота обновления", characteristics["max_update_frequency"]],
            ["Диагональ экрана", characteristics["screen_diagonal"]],
            ["Тип матрицы", characteristics["matrix_type"]],
            ["Тип подсветки", characteristics["underlight"]],
            ["Размер Vesa", characteristics["vesa_size"]],
            ["Разрешение экрана", characteristics["definition"]],
        ]);
    }

    private mapGraphicsCard(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Видеопамять", characteristics["video_ram"]],
            ["Максимальное число мониторов", characteristics["max_displays_supported"]],
            ["Коилчество занимвемых слотов", characteristics["used_slots"]],
            ["Видеопорты", characteristics["video_ports"]],
            ["Графическое ядро", characteristics["gpu"]["model"]],
        ]);
    }

    private mapHDD(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Ёмкость", characteristics["capacity"]],
            ["Скорость чтения", characteristics["read_speed"]],
            ["Скорость записи", characteristics["write_speed"]],
            ["Скорость оборота шпинделя", characteristics["rpm"]],
        ]);
    }

    private mapKeyboard(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Наличие RGB подсветки", characteristics["has_rgb_lighting"]],
            ["Беспроводная", characteristics["is_wireless"]],
            ["Типоразмер", characteristics["typesize"]],
            ["Тип", characteristics["type"]],
        ]);
    }

    private mapMotherboard(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Количетсов слотов ОЗУ", characteristics["ram_slots"]],
            ["Количество каналов ОЗУ", characteristics["ram_channels"]],
            ["Максимальная частота ОЗУ", characteristics["max_ram_frequency"]],
            ["Количество слотов PCI-e", characteristics["pcie_slots_count"]],
            ["Наличие поддержки NVMe", characteristics["has_nvme_support"]],
            ["Количество слотов M2", characteristics["m2_slots_count"]],
            ["Количество портов Sata", characteristics["sata_ports_count"]],
            ["Количество портов USB", characteristics["usb_ports_count"]],
            ["Количество портов RJ-45", characteristics["rj45_ports_count"]],
            ["Количество цифровых аудиопортов", characteristics["digital_audio_ports_count"]],
            ["Скорость сетевого адаптера", characteristics["network_adapter_speed"]],
            ["Форм-фактор", characteristics["form_factor"]],
            ["Сокет процессора", characteristics["cpu_socket"]],
            ["Версия PCI-e", characteristics["pcie_version"]],
            ["Поддерживаемые типы ОЗУ", characteristics["supported_ram_types"]],
            ["Видеопорты", characteristics["video_ports"]],
            ["Поддерживаемые ядра процессоров", characteristics["supported_cpu_cores"]],
            ["Чипсет", characteristics["motherboard_chipset"]["model"]],
            ["Аудиочипсет", characteristics["audio_chipset"]["model"]],
            ["Сетевой адаптер", characteristics["network_adapter"]["model"]],
        ]);
    }

    private mapMouse(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Количество кнопок", characteristics["buttons_count"]],
            ["Наличие программируемых кнопок", characteristics["has_programmable_buttons"]],
            ["Беспроводная", characteristics["is_wireless"]],
            ["Режимы работы DPI", characteristics["dpi_modes"]],
        ]);
    }

    private mapNVMeSSD(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Ёмкость", characteristics["capacity"]],
            ["Скорость чтения", characteristics["read_speed"]],
            ["Скорость записи", characteristics["write_speed"]],
            ["TBW", characteristics["tbw"]],
            ["DWPD", characteristics["dwpd"]],
            ["Количество бит на ячейку", characteristics["bits_for_cell"]],
            ["Контроллер", characteristics["controller"]["model"]],
        ]);
    }

    private mapPowerSupply(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Выходная мощность", characteristics["power_output"]],
            ["Количество портов Sata", characteristics["sata_ports"]],
            ["Количество портов Molex", characteristics["molex_ports"]],
            ["Сертификат 80Plus", characteristics["certificate_80plus"]],
        ]);
    }

    private mapRAM(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Общий объём", characteristics["total_size"]],
            ["Объём одноного модуля", characteristics["module_size"]],
            ["Количество модулей", characteristics["modules_count"]],
            ["Частота", characteristics["frequency"]],
            ["Тайминг cl", characteristics["cl"]],
            ["Тайминг tRCD", characteristics["trcd"]],
            ["Тайминг tRP", characteristics["trp"]],
            ["Тайминг tRAS", characteristics["tras"]],
            ["Тип", characteristics["type"]],
        ]);
    }

    private mapSataSSD(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["Ёмкость", characteristics["capacity"]],
            ["Скорость чтения", characteristics["read_speed"]],
            ["Скорость записи", characteristics["write_speed"]],
            ["TBW", characteristics["tbw"]],
            ["DWPD", characteristics["dwpd"]],
            ["Количество бит на ячейку", characteristics["bits_for_cell"]],
            ["Контроллер", characteristics["controller"]["model"]],
        ]);
    }

    private mapPreparedAssembly(characteristics: Characteristics): Map<string, any> {
        return new Map<string, any>([
            ["ОЗУ", characteristics["rams"]],
            ["Дисковые накопители", characteristics["disk_drives"]],
            ["Центральный процессор", characteristics["cpu"]],
            ["Материнская плата", characteristics["motherboard"]],
            ["Видеокарта", characteristics["graphics_card"]],
            ["Блок питания", characteristics["power_supply"]],
            ["Монитор", characteristics["display"]],
            ["Корпус", characteristics["computer_case"]],
            ["Клавиатура", characteristics["keyboard"]],
            ["Мышь", characteristics["mouse"]],
            ["Кулер для процессора", characteristics["cpu_cooler"]],
        ]);
    }

}

export const ItemCharacteristicsNameMapper = new ItemCharacteristicsNameMapperService();
