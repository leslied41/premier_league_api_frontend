import "../styles/RoleAlert.css";

const RoleAlert = ({ setshow_role_alert }) => {
  return (
    <div className="overlay">
      <div className="role-alert-container">
        <div>
          Sorry you don't have access to this api. Pleas login using admin
          account.
        </div>
        <div>
          <p>email: user@user.com</p>
          <p>password: 123456</p>
        </div>
        <div className="btns">
          <button
            onClick={() => {
              setshow_role_alert(false);
            }}
          >
            Sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleAlert;
