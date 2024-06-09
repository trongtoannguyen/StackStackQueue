
export const getTags = async (accessToken, axiosJWT) => {
  try {
    const res = await axiosJWT.get("admin/tags", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    console.log(`Error getTags`,err);
    return;
  }
}

export const createTag = async (accessToken, axiosJWT, tag) => {
  try {
    const res = await axiosJWT.post("admin/tags", tag, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    console.log(`Error createTag`,err);
    return;
  }
}

export const updateTag = async (accessToken, axiosJWT, tag) => {
  try {
    const res = await axiosJWT.put("admin/tags", tag, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    console.log(`Error updateTag`,err);
    return;
  }
}

export const deleteTag = async (accessToken, axiosJWT, tag) => {
  try {
    const res = await axiosJWT.delete("admin/tags", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: tag
    });
    return res;
  } catch (err) {
    console.log(`Error deleteTag`,err);
    return;
  }
}

// edit sort order of tag
export const editTagSortOrder = async (accessToken, axiosJWT, tag) => {
  try {
    const res = await axiosJWT.put("admin/tags/sortOrder", tag, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (err) {
    console.log(`Error editTagSortOrder`,err);
    return;
  }
}