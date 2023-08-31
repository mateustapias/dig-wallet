import { User } from '../../types';

export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';

export const actionUpdateUserDetails = (user: User) => ({
  type: UPDATE_USER_DETAILS,
  payload: {
    ...user,
  },
});
