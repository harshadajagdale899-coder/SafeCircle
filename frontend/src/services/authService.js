export const registerUser = async (data) => {
  const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Something went Wrong");
  }

  const resData = await response.json();
  console.log(resData);
  return resData;
};

export const loginUser = async (data) => {
  const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Something went Wrong");
  }

  const resData = await response.json();
  console.log(resData);
  return resData;
};

export const getCurrentUser = async (token) => {
  if (!token) {
    const error = new Error("Token is missing");
    error.status = 401;
    throw error;
  }
  const userResponse = await fetch("http://127.0.0.1:5000/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!userResponse.ok) {
    const error = new Error("Failed to fetch User");
    error.status = userResponse.status;
    throw error;
  }
  const user = await userResponse.json();

  console.log(user.data);
  return user.data;
};
