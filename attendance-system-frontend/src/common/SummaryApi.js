const SummaryApi = {
  adminRegister: {
    url: "/api/auth/admin/register",
  },
  adminLogin: {
    url: "/api/auth/admin/login",
  },
  registerEmployee: {
    url: "/api/auth/admin/register-employee",
  },
  getAllEmployees: {
    url: "/api/auth/admin/employees",
  },

  getAttendance: {
    url: "/api/auth/admin/attendance",
  },
  markAttendance: {
    url: "/api/employee/mark",
  },
  loginEmployee: {
    url: "/api/employee/login-employee",
  },
};

export default SummaryApi;
