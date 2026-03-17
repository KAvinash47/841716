import { useEffect, useState } from "react";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const handleAccept = (id) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status: "accepted" } : app
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleReject = (id) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status: "rejected" } : app
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Doctor Dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Manage all your appointments in one place
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto space-y-6">

        {appointments.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <p className="text-gray-500 text-lg">
              No appointments yet 📅
            </p>
          </div>
        ) : (
          appointments.map((app) => (

            <div
              key={app.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >

              {/* LEFT INFO */}
              <div className="space-y-1">

                <h3 className="text-xl font-semibold text-gray-800">
                  {app.doctorName}
                </h3>

                <p className="text-gray-600">
                  {app.speciality}
                </p>

                <p className="text-gray-600">
                  Fee: <span className="font-medium">₹{app.fee}</span>
                </p>

                <p className="text-gray-400 text-sm">
                  {new Date(app.bookingDate).toLocaleString()}
                </p>

                {/* STATUS BADGE */}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status || "pending"}
                </span>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex gap-3">

                <button
                  onClick={() => handleAccept(app.id)}
                  disabled={app.status === "accepted"}
                  className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                    app.status === "accepted"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 hover:scale-105"
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(app.id)}
                  disabled={app.status === "rejected"}
                  className={`px-5 py-2 rounded-lg text-white font-medium transition ${
                    app.status === "rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 hover:scale-105"
                  }`}
                >
                  Reject
                </button>

              </div>

            </div>

          ))
        )}

      </div>
    </div>
  );
};

export default Dashboard;