import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button } from "@mui/material";

type CounterProps = {
  initialCount?: number;
};

function Counter({ initialCount = 0 }: CounterProps) {
  const { t } = useTranslation();
  const [count, setCount] = useState<number>(initialCount);

  const increase = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const decrease = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "gray.100", borderRadius: 2 }}>
      <Typography variant="h2" sx={{ marginBottom: 4 }}>
        {t("counter:title")}
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            width: 40,
            height: 40,
            fontSize: 24,
            marginRight: 4,
          }}
          onClick={decrease}
        >
          -
        </Button>
        <Typography variant="h4" sx={{ fontSize: 24, fontWeight: "bold" }}>
          {count}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: 40,
            height: 40,
            fontSize: 24,
            marginLeft: 4,
          }}
          onClick={increase}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}

export default memo(Counter);
