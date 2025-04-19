import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const CheckAttendance = () => {
  const { empId } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📅 Custom button for date picker
  const CustomDateButton = ({ value, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
    >
      <FaCalendarAlt />
      {value ? value : "Select Date"}
    </button>
  );

  const fetchAttendance = async () => {
    if (!empId) {
      toast.error("Employee ID missing in URL");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios.get(`/api/auth/admin/attendance/${empId}`);

      if (response?.data?.records) {
        const filtered = filterBySelectedDate(response.data.records);
        setAttendanceData({
          count: filtered.length,
          records: filtered,
        });
      } else {
        toast.error("No attendance data found.");
        setAttendanceData(null);
      }
    } catch (error) {
      AxiosToastError(error);
      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  };

  const filterBySelectedDate = (records) => {
    if (!selectedDate) return records;

    return records.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate.toDateString() === selectedDate.toDateString();
    });
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-200 to-purple-300 px-6 py-10">
      <BackButton />
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-xl p-8 border border-gray-200 mt-10">
        <h2 className="text-4xl font-semibold text-indigo-800 mb-6">
          Employee Attendance
        </h2>

        <div className="mb-6">
          <label className="block mb-3 text-lg font-medium text-gray-700">
            Filter Attendance by Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<CustomDateButton />}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
            isClearable
            className="w-full"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-600">
            <div className="animate-spin border-t-4 border-blue-600 rounded-full w-12 h-12 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        ) : attendanceData ? (
          <div className="space-y-4">
            <p className="font-medium text-gray-800">
              Total Attendance Found - {attendanceData.count}
            </p>
            {attendanceData.records.length > 0 ? (
              attendanceData.records.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-lg shadow-md hover:shadow-xl transition duration-300"
                >
                  <img
                    src={record.photo}
                    alt="Employee"
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(record.date).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{record.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-red-500 mt-2 text-center">
                No attendance found for selected date.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No attendance data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckAttendance;
