import React from "react";
import { useUserContext } from "../../auth/AuthProvider";
import { useDeleteUserMutation, useLogout } from "../../auth/hooks";
import { AppLoader, Loader, Button, Box } from "../common";
import * as Styled from "./UserProfile.styled";

const UserProfile = () => {
  const [{ user }] = useUserContext();
  const { mutateAsync: deleteUser, isLoading } = useDeleteUserMutation();
  const logout = useLogout();

  const handleDelete = async () => {
    if (!user) {
      return null;
    }

    try {
      logout();
      const deletedUser = await deleteUser({
        id: user.id,
        username: user.username,
      });
      console.log("deletedUser", deletedUser);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <AppLoader isLoading={isLoading}>
      <Styled.UserProfilePage>
        <Styled.UserProfileContent>
          {user ? (
            <>
              <h2>User Profile</h2>
              <Box>
                <ul>
                  <li>
                    <strong>Username:</strong> {user.username}
                  </li>
                  <li>
                    <strong>Name:</strong> {user.name}
                  </li>
                  <li>
                    <strong>ID:</strong> {user.id}
                  </li>
                </ul>
              </Box>
            </>
          ) : (
            <Loader />
          )}

          <Button onClick={handleDelete}>Delete</Button>
        </Styled.UserProfileContent>
      </Styled.UserProfilePage>
    </AppLoader>
  );
};

export default UserProfile;
