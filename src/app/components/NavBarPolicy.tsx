"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PolicyTab } from "@/app/components/PolicyTab";

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
  // ширина по колонке
  minWidth: 0,
  width: '100%',

  // убираем центрирование
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  textAlign: 'left',
  textTransform: 'none',
  pl: 0,
  pr: 3,

  '& .MuiTab-wrapper': {
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '100%',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
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
        sx={{ borderRight: 1, borderColor: "divider" }}
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

      {tabs.map((tab, i) => {
        const hidden = value !== i;
        return (
          <div
            key={i}
            role="tabpanel"
            hidden={hidden}
            id={`${idPrefix}-tabpanel-${i}`}
            aria-labelledby={`${idPrefix}-tab-${i}`}
            className="w-full"
          >
            {!hidden && <Box>{tab.props.children}</Box>}
          </div>
        );
      })}
    </Box>
  );
}
