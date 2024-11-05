var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
});
export default class User extends compose(BaseModel, AuthFinder) {
    static selfAssignPrimaryKey = true;
    static assignUuid(user) {
        user.id = crypto.randomUUID();
    }
}
__decorate([
    column({ isPrimary: true, serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    column({ serializeAs: 'nickName' }),
    __metadata("design:type", String)
], User.prototype, "nickName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    column({ serializeAs: 'avatarUrl' }),
    __metadata("design:type", Object)
], User.prototype, "avatarUrl", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", Object)
], User.prototype, "token", void 0);
__decorate([
    column.dateTime({
        autoCreate: true,
        serialize: (value) => value.toISODate(),
        serializeAs: 'createdAt',
    }),
    __metadata("design:type", DateTime)
], User.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        serialize: (value) => value.toISODate(),
        serializeAs: 'updatedAt',
    }),
    __metadata("design:type", DateTime)
], User.prototype, "updatedAt", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "assignUuid", null);
//# sourceMappingURL=user.js.map