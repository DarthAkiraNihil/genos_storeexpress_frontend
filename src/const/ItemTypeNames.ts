import {ItemType} from "models/items";

export const ItemTypeNames: Map<ItemType, string> = new Map<ItemType, string> ([
    [ItemType.Motherboard, "Материнская плата"],
    [ItemType.CPU, "Центральный процессор"],
    [ItemType.RAM, "Оперативная память"],
    [ItemType.GraphicsCard, "Видеокарта"],

    [ItemType.HDD, "Жёсткий диск"],
    [ItemType.SataSSD, "Твердотельный накопитель Sata"],
    [ItemType.NVMeSSD, "Твердотельный накопитель NVMe"],
    [ItemType.Mouse, "Мышь"],
    [ItemType.Keyboard, "Клавиатура"],
    [ItemType.Display, "Монитор"],

    [ItemType.ComputerCase, "Компьютерный корпус"],
    [ItemType.PreparedAssembly, "Готовая сборка"],
])

export const ItemTypeNamesPrural: Map<ItemType, string> = new Map<ItemType, string> ([
    [ItemType.Motherboard, "Материнские платы"],
    [ItemType.CPU, "Центральные процессоры"],
    [ItemType.RAM, "Оперативные памяти"],
    [ItemType.GraphicsCard, "Видеокарты"],

    [ItemType.HDD, "Жёсткие диски"],
    [ItemType.SataSSD, "Твердотельные накопители Sata"],
    [ItemType.NVMeSSD, "Твердотельные накопители NVMe"],
    [ItemType.Mouse, "Мыши"],
    [ItemType.Keyboard, "Клавиатуры"],
    [ItemType.Display, "Мониторы"],

    [ItemType.ComputerCase, "Компьютерные корпуса"],
    [ItemType.PreparedAssembly, "Готовые сборки"],
])
