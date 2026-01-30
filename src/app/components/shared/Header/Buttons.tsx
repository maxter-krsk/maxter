import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/modules/Header/Buttons.module.css";

export function Buttons() {
  return (
    <div className="flex h-full flex-col divide-y divide-carbon dark:divide-paper w-full">
      <div className="flex flex-1">
        <Link className={styles.btnFillDiagonal} href="#">
          <span className={styles.btnFillDiagonalLabelBase}>
            Оставить заявку
          </span>
          <span className={styles.btnFillDiagonalLabelHover}>
            Оставить заявку
          </span>
        </Link>
      </div>
      <div className="flex flex-1">
        <Link className={styles.btnFillDiagonal} href="#">
          <span className={styles.btnFillDiagonalLabelBase}>Портфолио</span>
          <span className={styles.btnFillDiagonalLabelHover}>
            <Image
              className="w-[70%] h-auto block dark:hidden"
              src="/icons/ui/arrow-light.svg"
              alt="Перейти"
              width="102"
              height="1"
            />
            <Image
              className="w-[70%] h-auto hidden dark:block"
              src="/icons/ui/arrow-dark.svg"
              alt="Перейти"
              width="102"
              height="1"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
