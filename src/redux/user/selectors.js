export const selectUser = (store) => store.user.user;
export const selectUserLoading = (store) => store.user.loading;
export const selectUserError = (store) => store.user.error;
export const selectUserId = (store) => store.user.user?.id;