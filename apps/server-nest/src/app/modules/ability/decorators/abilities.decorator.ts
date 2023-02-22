/* eslint-disable max-classes-per-file */
import { SetMetadata } from '@nestjs/common';
import { User } from '../../users/schema/user.schema';
import { Book } from '../../books/schema/book.schema';
import { Actions } from '../factory/ability.factory';
import { RequiredRule } from '../interface/policies.interface';
import { Review } from '../../reviews/schema/review.schema';

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...handlers: RequiredRule[]) => SetMetadata(CHECK_ABILITY, handlers);

export const readUserAbility: RequiredRule = {
  action: Actions.Read,
  subject: User,
};

export const createUserAbility: RequiredRule = {
  action: Actions.Create,
  subject: User,
};

export const deleteUserAbility: RequiredRule = {
  action: Actions.Delete,
  subject: User,
};

export const updateUserAbility: RequiredRule = {
  action: Actions.Update,
  subject: User,
};

export const readBookAbility: RequiredRule = {
  action: Actions.Read,
  subject: Book,
};

export const createBookAbility: RequiredRule = {
  action: Actions.Create,
  subject: Book,
};

export const deleteBookAbility: RequiredRule = {
  action: Actions.Delete,
  subject: Book,
};

export const updateBookAbility: RequiredRule = {
  action: Actions.Update,
  subject: Book,
};

export const readReviewAbility: RequiredRule = {
  action: Actions.Read,
  subject: Review,
};

export const createReviewAbility: RequiredRule = {
  action: Actions.Create,
  subject: Review,
};

export const deleteReviewAbility: RequiredRule = {
  action: Actions.Delete,
  subject: Review,
};

export const updateReviewAbility: RequiredRule = {
  action: Actions.Update,
  subject: Review,
};
