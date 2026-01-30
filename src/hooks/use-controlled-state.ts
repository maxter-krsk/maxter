"use client";

import * as React from "react";

type UseControlledStateProps<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

/**
 * Controlled/uncontrolled state helper:
 * - if `value` is provided → controlled
 * - else → uncontrolled with internal state
 */
export function useControlledState<T>({
  value,
  defaultValue,
  onChange,
}: UseControlledStateProps<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue);
  const isControlled = value !== undefined;

  const state = isControlled ? (value as T) : uncontrolled;

  const setState = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === "function" ? (next as (prev: T) => T)(state) : next;

      if (!isControlled) setUncontrolled(nextValue);
      onChange?.(nextValue);
    },
    [isControlled, onChange, state]
  );

  return [state, setState] as const;
}
