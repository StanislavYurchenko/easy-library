import { Actions, Subjects } from '../factory/ability.factory';

export interface RequiredRule {
  readonly action: Actions;
  readonly subject: Subjects;
}
