
type AdditionalProps = {
    [key: string]: string | number
}

type Update<T> ={
    [key in keyof T]?: T[key] extends object ? Update<T[key]> : T[key]
}

type Partial<T> = {
    [P in keyof T]?: T[P]
}

interface IIcon {
    width: IconProps['width']
}