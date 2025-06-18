import styles from './styles.module.scss'
import SvgIcon from "../SvgIcon";
import type { FunctionComponent, SVGProps} from "react";

interface Props {
    text: string,
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    onClick?: () => void;
}

export default function CategoryComponent({text,icon,onClick}: Props) {
    return(
        <div className={styles.container} onClick={onClick}>
            <SvgIcon color="#4A5568" icon={icon} width={64} height={64} />
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}