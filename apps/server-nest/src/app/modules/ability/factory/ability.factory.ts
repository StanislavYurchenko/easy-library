import { Injectable } from '@nestjs/common';
import { AbilityBuilder, MongoAbility, createMongoAbility, InferSubjects, ExtractSubjectType } from '@casl/ability';
import { User } from '../../users/schema/user.schema';
import { Review } from '../../reviews/schema/review.schema';
import { Book } from '../../books/schema/book.schema';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User | typeof Review | typeof Book> | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: Partial<User>) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.isAdmin) {
      can(Actions.Manage, 'all');
    } else {
      can(Actions.Read, 'all');
      can(Actions.Update, User, { id: user.id });
      can(Actions.Create, Review);
      can(Actions.Update, Review, { author: user.id });
    }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
