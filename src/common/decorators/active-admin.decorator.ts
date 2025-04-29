import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_ADMIN_KEY } from '../constants';
import { ActiveAdminData } from '../interfaces/active-admin-data.interface';

export const ActiveAdmin = createParamDecorator(
  (field: keyof ActiveAdminData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const admin: ActiveAdminData | undefined = request[REQUEST_ADMIN_KEY];
    return field ? admin?.[field] : admin;
  },
);
