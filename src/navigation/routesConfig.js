import Home from "../pages/Home";
import Marks from "../pages/Marks";
import Attendence from "../pages/Attendence";
import Exams from "../pages/Exams";
import TimeTable from "../pages/TimeTable";
import Activities from "../pages/Activities";
import Fees from "../pages/Fees";

export const screens = [
  { name: "Home", component: Home, title: "Home", roles: ["user"] },
  { name: "Marks", component: Marks, title: "Marks", roles: ["user"] },
  { name: "Attendence", component: Attendence, title: "Attendence", roles: ["user"] },
  { name: "Exams", component: Exams, title: "Exams", roles: ["user"] },
  { name: "Timetable", component: TimeTable, title: "Timetable", roles: ["user"] },
  { name: "Activities", component: Activities, title: "Activities", roles: ["user"] },
  { name: "Fees", component: Fees, title: "Fees", roles: ["user"] },
];
