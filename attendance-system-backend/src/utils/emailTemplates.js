const employeeWelcomeTemplate = (name, empId, password) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2e6da4;">🎉 Welcome to the Company, ${name}!</h2>
        <p>We're excited to have you onboard as part of the <strong>Employee Team</strong>.</p>
        <p>Here are your login credentials:</p>
        <ul style="line-height: 1.6;">
          <li><strong>Employee ID:</strong> ${empId}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>You can now log in to the employee portal using the above credentials.</p>
        <p style="color: red;"><strong>Note:</strong> Please make sure to change your password after your first login.</p>
        <br />
        <p>Best Regards,<br /><strong>HR Team</strong></p>
      </div>
    `;
  };
  
  module.exports = employeeWelcomeTemplate;