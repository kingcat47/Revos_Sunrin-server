
import styles from './styles.module.scss';

const IPhoneCard = () => {
    return (
        <div className={styles.iphone_card}>
            <div className={styles.card_header}>
                <div className={styles.background_gradient}></div>
                <h1 className={styles.product_title}>iPhone 16</h1>
                <div className={styles.phone_stack}>
                    <div className={styles.phone_device}></div>
                    <div className={styles.phone_device}></div>
                    <div className={styles.phone_device}></div>
                </div>
            </div>

            <div className={styles.card_content}>
                <h3 className={styles.article_title}>
                    How to use Hobini Phone16
                </h3>

                <p className={styles.article_description}>
                    The Jwa Ho Bin cell phone is superior and Apple's technology
                    is overwhelming. Let's use the iPhone. We will never stop praising
                    Jwa Ho Bin, and we can say that it is a blessing in life...
                </p>
            </div>
        </div>
    );
};

export default IPhoneCard;