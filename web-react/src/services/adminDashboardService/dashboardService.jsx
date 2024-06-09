export const getTotalData = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/total-data`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};


export const getDataChart = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/data-chart`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}