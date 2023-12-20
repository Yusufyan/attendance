import { checkinRequestDTO, checkoutRequestDTO } from "../dtos/attendance.dto";
import { Attendances } from "../models/attendance.model";
import { getManager } from "typeorm";
import * as geolib from "geolib";
import { User } from "../models/user.model";
import ApiError from "../configs/api-error.config";
import { isToday } from "date-fns";

export async function checkinService(body: checkinRequestDTO, userId: string) {
  const entityManager = getManager();

  const getUser = await entityManager.findOne(User, {
    where: {
      id: userId,
    },
  });

  const getAttendance = await entityManager.findOne(Attendances, {
    where: {
      employee: {
        id: userId,
      },
    },
    order: {
      created_at: "DESC",
    },
  });

  if (getAttendance && isToday(getAttendance?.checkin))
    throw new ApiError(409, "Already checkin");

  const company = {
    latitude: "-6.794397198778948",
    longitude: "110.80746040610167",
  };

  const distanceInMeters = geolib.getDistance(company, {
    latitude: body.coordinatesIn.split(",")[0],
    longitude: body.coordinatesIn.split(",")[1],
  });

  if (distanceInMeters <= 10) {
    const checkin = await entityManager.save(Attendances, {
      employee: getUser,
      coordinatesIn: body.coordinatesIn,
      checkin: new Date(),
      at_office: true,
    });
  } else {
    const checkin = await entityManager.save(Attendances, {
      employee: getUser,
      coordinatesIn: body.coordinatesIn,
      checkin: new Date(),
      at_office: false,
    });
  }
}

export async function checkoutService(
  body: checkoutRequestDTO,
  userId: string
) {
  const entityManager = getManager();

  const getAttendance = await entityManager.findOne(Attendances, {
    where: {
      employee: {
        id: userId,
      },
    },
    relations: ["employee"],
  });

  if (!getAttendance) throw new ApiError(404, "Dereng checkin");

  const calcDate = new Date().getTime() - getAttendance.checkin.getTime();
  const calculated = calcDate / (1000 * 60 * 60);

  if (getAttendance.checkout !== null) {
    throw new ApiError(409, `Already checkouted at ${getAttendance.checkout}`);
  }

  if (calculated <= 9) {
    throw new ApiError(400, `Checkout failed, working time less than 8 hours`);
  }

  const checkout = await entityManager.update(
    Attendances,
    { employee: userId },
    {
      coordinatesOut: body.coordinatesOut,
      checkout: new Date(),
      updated_at: new Date(),
    }
  );
}
