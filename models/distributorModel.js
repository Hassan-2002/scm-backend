import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    billingAddress: {
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      stateOrProvince: {
        type: String,
        required: true,
      },
      zipOrPostalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    warehouseAddress: [
      {
        streetAddress: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        stateOrProvince: {
          type: String,
          required: false,
        },
        zipOrPostalCode: {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
      },
    ],
    bankDetails: {
      bankName: {
        type: String,
        required: false,
      },
      accountNumber: {
        type: String,
        required: false,
      },
      ifscOrSwiftCode: {
        type: String,
        required: false,
      },
      branchName: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("distributors", distributorSchema);