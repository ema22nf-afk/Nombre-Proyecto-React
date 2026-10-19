import React from "react";
import { EduConnectProvider, useEduConnect } from "./context";
import { PhoneFrame } from "./components/common/PhoneFrame";
import { QuickNav } from "./components/common/QuickNav";

// Auth
import { WelcomeScreen } from "./components/auth/WelcomeScreen";
import { LoginScreen } from "./components/auth/LoginScreen";
import { RegisterScreen } from "./components/auth/RegisterScreen";
import { ForgotPasswordScreen } from "./components/auth/ForgotPasswordScreen";

// Student
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentProfile } from "./components/student/StudentProfile";
import { StudentNotifications } from "./components/student/StudentNotifications";
import { AddSubjectStudent } from "./components/student/AddSubjectStudent";
import { SubjectCover } from "./components/student/SubjectCover";
import { SubjectOptionsMenu } from "./components/student/SubjectOptionsMenu";
import { SubjectGrades } from "./components/student/SubjectGrades";
import { SubjectTasks } from "./components/student/SubjectTasks";
import { TaskDetail } from "./components/student/TaskDetail";
import { AddTaskModal } from "./components/student/AddTaskModal";
import { SubjectChat } from "./components/student/SubjectChat";

// Teacher
import { TeacherDashboard } from "./components/teacher/TeacherDashboard";
import { TeacherProfile } from "./components/teacher/TeacherProfile";
import { TeacherNotifications } from "./components/teacher/TeacherNotifications";
import { TeacherAddSubject } from "./components/teacher/TeacherAddSubject";
import { TeacherSubjectGrades } from "./components/teacher/TeacherSubjectGrades";
import { TeacherStudentList } from "./components/teacher/TeacherStudentList";
import { TeacherStudentDetail } from "./components/teacher/TeacherStudentDetail";
import { TeacherStudentChat } from "./components/teacher/TeacherStudentChat";
import { TeacherStudentGrades } from "./components/teacher/TeacherStudentGrades";
import { TeacherGradeActivity } from "./components/teacher/TeacherGradeActivity";

import "./styles/educonnect.css";

const ScreenRouter = () => {
  const { currentView } = useEduConnect();
  const { screen, params } = currentView;

  switch (screen) {
    case "welcome":
      return <WelcomeScreen />;
    case "login":
      return <LoginScreen />;
    case "register":
      return <RegisterScreen />;
    case "forgot-password":
      return <ForgotPasswordScreen />;

    // Student Views
    case "student-dashboard":
      return <StudentDashboard />;
    case "student-profile":
      return <StudentProfile />;
    case "student-notifications":
      return <StudentNotifications />;
    case "student-add-subject":
      return <AddSubjectStudent />;
    case "subject-cover":
      return <SubjectCover subjectId={params.subjectId} />;
    case "subject-options":
      return <SubjectOptionsMenu subjectId={params.subjectId} />;
    case "subject-grades":
      return <SubjectGrades subjectId={params.subjectId} />;
    case "subject-tasks":
      return <SubjectTasks subjectId={params.subjectId} />;
    case "task-detail":
      return (
        <TaskDetail
          subjectId={params.subjectId}
          taskId={params.taskId}
        />
      );
    case "add-task":
      return <AddTaskModal subjectId={params.subjectId} />;
    case "subject-chat":
      return <SubjectChat subjectId={params.subjectId} />;

    // Teacher Views
    case "teacher-dashboard":
      return <TeacherDashboard />;
    case "teacher-profile":
      return <TeacherProfile />;
    case "teacher-notifications":
      return <TeacherNotifications />;
    case "teacher-add-subject":
      return <TeacherAddSubject />;
    case "teacher-subject-grades":
      return <TeacherSubjectGrades subjectId={params.subjectId} />;
    case "teacher-student-list":
      return (
        <TeacherStudentList
          subjectId={params.subjectId}
          subjectName={params.subjectName}
          grade={params.grade}
        />
      );
    case "teacher-student-detail":
      return (
        <TeacherStudentDetail
          studentId={params.studentId}
          studentName={params.studentName}
          subjectId={params.subjectId}
          subjectName={params.subjectName}
          grade={params.grade}
          gradeKey={params.gradeKey}
        />
      );
    case "teacher-student-chat":
      return (
        <TeacherStudentChat
          studentId={params.studentId}
          studentName={params.studentName}
          subjectId={params.subjectId}
          subjectName={params.subjectName}
          grade={params.grade}
          gradeKey={params.gradeKey}
        />
      );
    case "teacher-student-grades":
      return (
        <TeacherStudentGrades
          studentId={params.studentId}
          studentName={params.studentName}
          subjectId={params.subjectId}
          subjectName={params.subjectName}
          grade={params.grade}
          gradeKey={params.gradeKey}
        />
      );
    case "teacher-grade-activity":
      return (
        <TeacherGradeActivity
          studentId={params.studentId}
          studentName={params.studentName}
          subjectId={params.subjectId}
          subjectName={params.subjectName}
          grade={params.grade}
          gradeKey={params.gradeKey}
          activityId={params.activityId}
          activityTitle={params.activityTitle}
          activitySubtitle={params.activitySubtitle}
          activityDesc={params.activityDesc}
          activityFile={params.activityFile}
        />
      );

    default:
      return <WelcomeScreen />;
  }
};

const AppContent = () => {
  const { currentView } = useEduConnect();
  const isCream =
    currentView.screen === "welcome" ||
    currentView.screen.includes("chat");

  return (
    <div className="phone-wrapper">
      <QuickNav />
      <PhoneFrame isCream={isCream}>
        <ScreenRouter />
      </PhoneFrame>
    </div>
  );
};

export default function App() {
  return (
    <EduConnectProvider>
      <AppContent />
    </EduConnectProvider>
  );
}
