"use client";

import { useMemo } from "react";
import { createPortal } from "react-dom";
import { TailSpin } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader() {
  // ищем DOM-элемент ОДИН раз — на клиенте useMemo отработает корректно
  const root = useMemo(() => document.getElementById("loader-root"), []);

  if (!root) return null;

  return createPortal(
    <div className={styles.overlay}>
      <TailSpin
        visible
        height={80}
        width={80}
        color="var(--royal-blue-lighter)"
        ariaLabel="tail-spin-loading"
      />
    </div>,
    root
  );
}
