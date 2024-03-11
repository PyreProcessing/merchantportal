/**
 * @description checks an array of provided roles, against the user roles
 *              if the user has any of the provided roles, the function returns true
 *              else it returns false
 * @param userRoles - array of user roles
 * @param roles - array of roles to check against
 * @returns boolean
 * @example
 * const userRoles = ['admin', 'user']
 * const roles = ['admin']
 * checkRole(userRoles, roles) // returns true
 *
 * @author Austin Howard
 * @lastModified 2024-02-06 08:53:07
 * @version 1.0.0
 */
export default (userRoles: string[], roles: string[]): boolean => {
  return roles.some((role) => userRoles?.includes(role));
};
