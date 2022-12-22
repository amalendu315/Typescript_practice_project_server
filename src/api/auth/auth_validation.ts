export const sRegisterUser = {
  $id: "registerUser",
  body: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      lastName: {
        type: "string",
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      friends: {
        type: "array",
        default: [],
      },
      email: {
        type: "string",
        required: true,
        minLength: 6,
        maxLength: 255,
        unique: true,
      },
      password: {
        type: "string",
        required: true,
        minLength: 6,
        maxLength: 255,
      },
      picturePath: {
        type: "string",
        default: "",
      },
      location: {
        type: "string",
      },
      occupation: {
        type: String,
      },
      viewedProfile: {
        type: Number,
      },
      impressions: {
        type: Number,
      },
    },
    timestamps: true,
  },
};

export const sLoginUser = {
    $id: "loginUser",
    body: {
        type: "object",
        properties: {
            email: {
                type: "string",
                required: true,
                minLength: 6,
                maxLength: 255,
            },
            password: {
                type: "string",
                required: true,
                minLength: 6,
                maxLength: 255,
            },
        },
    },
};
