import { ForbiddenError } from '@casl/ability';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY } from '../decorators/abilities.decorator';
import { AbilityFactory } from '../factory/ability.factory';
import { RequiredRule } from '../interface/policies.interface';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(private reflector: Reflector, private abilityFactory: AbilityFactory) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const rules: RequiredRule[] = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];
      const { user } = context.switchToHttp().getRequest();
      const ability = this.abilityFactory.defineAbility(user);

      console.log('=> rules', rules);

      rules.forEach(rule => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject, rule.field);
        console.log('rule', rule);
      });

      return true;
    } catch (err: any) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }

      return false;
    }
  }
}
