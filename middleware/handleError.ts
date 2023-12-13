import { NextResponse } from "next/server";

const HandleError = (err: any) => {
  let statusCode = err.statusCode || 500;
  let message = err._message || err.message || "Internal server error";

  console.log({ err });

  if (err.name === "ValidationError") {
    // Handling MongoDB validation errors
    statusCode = 422; // Unprocessable Entity
    const validationErrors = Object.values(err.errors).map(
      (error: any) => error.message
    );
    message = validationErrors[0] || "Validation error";

    // return  NextResponse(statusCode).json({
    //   success: false,
    //   message,
    //   error: validationErrors,
    // });

    return NextResponse.json(
      {
        success: false,
        message,
        error: validationErrors,
      },
      { status: statusCode }
    );
  } else {
    // Handling other errors
    return NextResponse.json({
      success: false,
      message,
    });
  }
};

export default HandleError;
