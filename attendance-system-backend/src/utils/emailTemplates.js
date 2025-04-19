const employeeWelcomeTemplate = (name, empId, password) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; background-color: #f9f9f9; border-radius: 8px; color: #333;">
      <h2 style="color: #007BFF; margin-bottom: 12px;">🎉 Welcome to the Team, ${name}!</h2>
      
      <p style="font-size: 16px; margin-bottom: 10px;">
        We're thrilled to have you join our <strong>Employee Team</strong>. Your journey with us begins now!
      </p>

      <p style="font-size: 16px; margin-bottom: 10px;">Here are your login credentials:</p>
      
      <ul style="font-size: 16px; line-height: 1.6; margin-left: 20px; margin-bottom: 16px;">
        <li><strong>Employee ID:</strong> ${empId}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>

      <p style="font-size: 16px; margin-bottom: 10px;">
        You can access the <strong>Employee Portal</strong> using these credentials.
      </p>

      <p style="font-size: 15px; color: #c0392b; margin-bottom: 24px;">
        <strong>Note:</strong> For your security, please update your password after your first login.
      </p>

      <p style="font-size: 16px;">
        Wishing you great success ahead!<br />
      </p>
    </div>
  `;
};

module.exports = employeeWelcomeTemplate;
