import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";

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
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">{t("counter:title")} </h2>
      <div className="flex items-center justify-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
          onClick={decrease}
        >
          -
        </button>
        <span className="text-xl font-semibold">{count}</span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={increase}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default memo(Counter);
