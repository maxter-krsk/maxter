"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PolicyTab } from "@/app/components/PolicyTab";
import { AnimatePresence, motion } from "framer-motion";

function a11y(idPrefix: string, index: number) {
  return {
    id: `${idPrefix}-tab-${index}`,
    "aria-controls": `${idPrefix}-tabpanel-${index}`,
  };
}

export default function NavBarPolicy({
  children,
  idPrefix = "policy",
  ariaLabel = "Табы правовой информации",
}: {
  children: React.ReactNode;
  idPrefix?: string;
  ariaLabel?: string;
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (_e: React.SyntheticEvent, v: number) => setValue(v);

  const tabs = React.Children.toArray(children).filter(
    (
      child
    ): child is React.ReactElement<{
      label: string;
      children: React.ReactNode;
    }> => React.isValidElement(child) && child.type === PolicyTab
  );

  const tabSx = {
    minWidth: 0,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    textTransform: "none",
    pl: 0,
    pr: 3,

    "& .MuiTab-wrapper": {
      alignItems: "flex-start",
      textAlign: "left",
      width: "100%",
      whiteSpace: "normal",
      wordBreak: "break-word",
    },

    "&.Mui-selected": {
      color: "#423060",
      fontWeight: "bold",
    },
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "260px 1fr" },
        columnGap: 3,
		minHeight: 400,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
        sx={{
          borderRight: 1,
          borderColor: "black",
          "& .MuiTabs-indicator": {
            backgroundColor: "#423060",
            width: 5,
          },
        }}
      >
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            label={tab.props.label}
            {...a11y(idPrefix, i)}
            sx={tabSx}
          />
        ))}
      </Tabs>

      <AnimatePresence mode="wait">
        {tabs.map((tab, i) =>
          value === i ? (
            <motion.div
              key={i}
              role="tabpanel"
              id={`${idPrefix}-tabpanel-${i}`}
              aria-labelledby={`${idPrefix}-tab-${i}`}
              className="w-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Box sx={{ py: 3, px: 0 }}>{tab.props.children}</Box>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </Box>
  );
}
