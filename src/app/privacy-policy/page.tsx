"use client";

import { motion } from "framer-motion";
import { unbounded, roboto } from "@/app/ui/fonts";

export default function PrivacyPolicy() {
  return (
      <section>
        <motion.div
          className="container"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
		  transition={{ duration: .5 }}
        >
          <h1
            className={`${unbounded.className} font-bold text-center mt-30 text-[1.5rem]`}
          >
            Политика конфиденциальности
          </h1>
          <p className={`${roboto.className} text-center pt-5 text-[1.25rem]`}>
            Страница в разработке
          </p>
        </motion.div>
      </section>
  );
}
