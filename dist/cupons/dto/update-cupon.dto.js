"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCuponDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cupon_dto_1 = require("./create-cupon.dto");
class UpdateCuponDto extends (0, mapped_types_1.PartialType)(create_cupon_dto_1.CreateCuponDto) {
}
exports.UpdateCuponDto = UpdateCuponDto;
//# sourceMappingURL=update-cupon.dto.js.map