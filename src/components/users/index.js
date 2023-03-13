import { useSelector } from "react-redux";
import { getUsers } from "../../store/slices/usersSlice";
const Index = ({ showModal }) => {
  const users = useSelector(getUsers);
  return (
    <>
      {users && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={showModal}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Index;
