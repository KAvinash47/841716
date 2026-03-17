import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { RiRegisteredLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDocumentTitle from '../hooks/useDocumentTitle';

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [hasBooked, setHasBooked] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔥 NEW STATES
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");

    // 🔥 TIME SLOTS
    const timeSlots = [
        "10:00 AM", "11:00 AM", "12:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    useDocumentTitle(doctor ? `${doctor.name}` : 'Doctor Details');

    useEffect(() => {
        setLoading(true);

        const bookings = JSON.parse(localStorage.getItem('appointments')) || [];
        const existingBooking = bookings.find(
            booking => booking.doctorId === parseInt(id)
        );
        setHasBooked(!!existingBooking);

        fetch('/Data/doctors.json')
            .then(res => res.json())
            .then(data => {
                const selectedDoctor = data.find(doc => doc.id === parseInt(id));
                setDoctor(selectedDoctor);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="fixed inset-0 backdrop-blur-md bg-black/30 z-50 flex items-center justify-center">
                <span className="loading loading-bars loading-xl text-blue-600"></span>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">No Doctor Found</h2>
                <p className="text-gray-600">
                    The doctor you are looking for with this id:
                    <span className='text-red-400'> {id}</span>
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const isAvailableToday = doctor.workingDays.includes(today);

    const handleBooking = () => {

        if (!isAvailableToday) {
            toast.error('Doctor is unavailable today');
            return;
        }

        if (hasBooked) {
            toast.error('You have already booked an appointment!');
            return;
        }

        // 🔥 VALIDATION
        if (!selectedDate) {
            toast.error("Please select a date");
            return;
        }

        if (!selectedSlot) {
            toast.error("Please select a time slot");
            return;
        }

        const bookings = JSON.parse(localStorage.getItem('appointments')) || [];

        // 🔥 PREVENT DOUBLE SLOT BOOKING
        const alreadyBooked = bookings.find(
            b =>
                b.doctorId === doctor.id &&
                b.appointmentDate === selectedDate &&
                b.timeSlot === selectedSlot
        );

        if (alreadyBooked) {
            toast.error("This slot is already booked!");
            return;
        }

        const newBooking = {
            id: Date.now(),
            doctorId: doctor.id,
            doctorName: doctor.name,
            education: doctor.qualification,
            speciality: doctor.specialization,
            fee: doctor.consultationFee,
            bookingDate: new Date().toISOString(),
            appointmentDate: selectedDate,
            timeSlot: selectedSlot,
            status: "pending"
        };

        localStorage.setItem('appointments', JSON.stringify([...bookings, newBooking]));

        toast.success(`Appointment booked with ${doctor.name}`);

        setTimeout(() => navigate('/my-bookings'), 2000);
    };

    return (
        <div>
            <div className="w-11/12 mx-auto py-16 space-y-6">

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Doctor's Profile Details
                    </h2>
                    <p className="text-gray-600 text-center">
                        View doctor details, availability and book your appointment easily.
                    </p>
                </div>

                {/* Doctor Info */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">
                    <div className="flex flex-col md:flex-row gap-8">

                        <div className="md:w-1/3">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="rounded-2xl w-full object-cover"
                            />
                        </div>

                        <div className="md:w-2/3 space-y-4">
                            <h3 className="text-3xl font-bold">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.qualification}</p>
                            <p className="text-gray-600">{doctor.specialization}</p>

                            <p><b>Hospital:</b> {doctor.hospital}</p>

                            <p>
                                Reg No: {doctor.registration?.split(': ')[1] || "N/A"}
                            </p>

                            <div className="flex gap-2 flex-wrap">
                                {doctor.workingDays.map((day, i) => (
                                    <span key={i} className="bg-yellow-100 px-3 py-1 rounded-full text-sm">
                                        {day}
                                    </span>
                                ))}
                            </div>

                            <p className="text-blue-600 font-semibold">
                                ₹{doctor.consultationFee}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Booking */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">

                    <h3 className="text-2xl font-bold text-center mb-6">
                        Book Appointment
                    </h3>

                    {/* Date */}
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-4"
                    />

                    {/* Slots */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {timeSlots.map((slot, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedSlot(slot)}
                                className={`p-2 rounded-lg border ${
                                    selectedSlot === slot
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleBooking}
                        disabled={!isAvailableToday || hasBooked}
                        className={`w-full py-4 rounded-full text-lg ${
                            !isAvailableToday || hasBooked
                                ? "bg-gray-300"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        Book Appointment
                    </button>

                </div>
            </div>

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default DoctorDetails;