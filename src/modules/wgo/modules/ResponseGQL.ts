import { ClassType, Field, ObjectType } from 'type-graphql';

export function GenericResponseGQL<T>(TItemClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ResponseGQL {
    @Field()
    isSuccess: boolean;
    @Field(() => TItemClass, { nullable: true })
    result: T | null;
    @Field(() => String, { nullable: true })
    message: string | null;
    @Field(() => String, { nullable: true })
    error: string | null;
  }
  return ResponseGQL;
}

export function GenericArrayResponseGQL<T>(TItemClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ArrayResponseGQL {
    @Field()
    isSuccess: boolean;
    @Field(() => [TItemClass])
    result: T[] | null;
    @Field(() => String, { nullable: true })
    message: string | null;
    @Field(() => String, { nullable: true })
    error: string | null;
  }
  return ArrayResponseGQL;
}
