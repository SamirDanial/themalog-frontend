import React, { useState, useCallback } from "react";
import { PrimaryButton } from "../components/buttons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { startOfMonth, endOfMonth, format } from "date-fns";
import axiosInstance from "../libs/axios_instance";
import BarChart from "../components/bar-chart";
import DateRangePicker from "../components/date-range-picker";
import { useWebSocket } from "../hooks/useWebSocket";
import AddNewTemperature from "../components/add-new-temperature";

const getSensorsInfo = async (data: {
  fromDate: string | undefined;
  toDate: string | undefined;
}) => {
  const URL =
    data.fromDate && data.toDate
      ? `/temperatures?start=${data.fromDate}&end=${data.toDate}`
      : "/temperatures";
  const response = await axiosInstance.get(URL);
  return response.data;
};

const today = new Date();

const Dashboard: React.FC = () => {
  const [fromDate, setFromDate] = useState<string | undefined>(
    format(startOfMonth(today), "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState<string | undefined>(
    format(endOfMonth(today), "yyyy-MM-dd")
  );

  const [addMode, setAddMode] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["filterSensors", { fromDate, toDate }],
    queryFn: () => getSensorsInfo({ fromDate, toDate }),
  });

  const handleDateFromChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFromDate(event.target.value);
    },
    []
  );

  const handleDateToChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setToDate(event.target.value);
    },
    []
  );

  const handleTemperatureUpdate = () => {
    queryClient.invalidateQueries({
      queryKey: ["filterSensors", { fromDate, toDate }],
    });
  };

  useWebSocket(handleTemperatureUpdate);

  return (
    <div>
      {addMode && (
        <div>
          <AddNewTemperature onClose={() => setAddMode(false)} />
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]"
            onClick={() => setAddMode(false)}
          />
        </div>
      )}
      <div className="sticky top-0 flex flex-row justify-end mr-5">
        <PrimaryButton
          type="button"
          text="Add New"
          onClick={() => setAddMode(true)}
        />
      </div>
      <div className="flex flex-row justify-center gap-3">
        <DateRangePicker
          id="from"
          name="from"
          label="From"
          value={fromDate || ""}
          onChange={handleDateFromChange}
        />
        <DateRangePicker
          id="to"
          name="to"
          label="To"
          value={toDate || ""}
          onChange={handleDateToChange}
        />
      </div>
      <div className="flex flex-row flex-wrap">
        {data &&
          data.length > 0 &&
          !isLoading &&
          data.map(
            (sensor: {
              sensor_id: string;
              _min: { temperature: number };
              _max: { temperature: number };
              _avg: { temperature: number };
            }) => {
              return (
                <div key={sensor.sensor_id} className="w-[400px] h-[400px]">
                  <BarChart
                    sensor={{
                      id: sensor.sensor_id,
                      min: sensor._min.temperature,
                      max: sensor._max.temperature,
                      avg: sensor._avg.temperature,
                    }}
                  />
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Dashboard;
