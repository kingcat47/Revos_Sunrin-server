import styles from './styles.module.scss'

interface InputProps{
    className?:string;
    placeholder?:string;
    type?:string;
    value?:string;
    onChange?: ()=>{};
}


export const InputComponents = ({className,placeholder,type,value}:InputProps)=> {
    return(
        <>
        <div className={[styles.container, className].join("")}>

        </div>
        </>
    )
}