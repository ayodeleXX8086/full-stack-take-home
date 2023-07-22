import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Chatroom = {
  __typename?: 'Chatroom';
  callerPhoneNumber: Scalars['String']['output'];
  chatroomnotes?: Maybe<Array<ChatroomnoteTypes>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  natureCode?: Maybe<NatureCode>;
  resolved: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChatroomnoteTypes = {
  __typename?: 'ChatroomnoteTypes';
  chatroom: Chatroom;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Autogenerated input type of CreateChatroom */
export type CreateChatroomInput = {
  callerPhoneNumber: Scalars['String']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  label: Scalars['String']['input'];
  natureCodeId?: InputMaybe<Scalars['ID']['input']>;
};

/** Autogenerated return type of CreateChatroom. */
export type CreateChatroomPayload = {
  __typename?: 'CreateChatroomPayload';
  chatroom: Chatroom;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of CreateChatroomnotes */
export type CreateChatroomnotesInput = {
  chatroomId: Scalars['ID']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  note: Scalars['String']['input'];
};

/** Autogenerated return type of CreateChatroomnotes. */
export type CreateChatroomnotesPayload = {
  __typename?: 'CreateChatroomnotesPayload';
  chatroomnote: ChatroomnoteTypes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of DeleteChatroomnotes */
export type DeleteChatroomnotesInput = {
  chatroomId: Scalars['ID']['input'];
  chatroomnoteId: Scalars['ID']['input'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated return type of DeleteChatroomnotes. */
export type DeleteChatroomnotesPayload = {
  __typename?: 'DeleteChatroomnotesPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  result: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatroom?: Maybe<CreateChatroomPayload>;
  createChatroomnotes?: Maybe<CreateChatroomnotesPayload>;
  deleteChatroomnotes?: Maybe<DeleteChatroomnotesPayload>;
  updateChatroom?: Maybe<UpdateChatroomPayload>;
};


export type MutationCreateChatroomArgs = {
  input: CreateChatroomInput;
};


export type MutationCreateChatroomnotesArgs = {
  input: CreateChatroomnotesInput;
};


export type MutationDeleteChatroomnotesArgs = {
  input: DeleteChatroomnotesInput;
};


export type MutationUpdateChatroomArgs = {
  input: UpdateChatroomInput;
};

export type NatureCode = {
  __typename?: 'NatureCode';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  chatroom: Chatroom;
  chatrooms: Array<Chatroom>;
  natureCodes: Array<NatureCode>;
};


export type QueryChatroomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChatroomsArgs = {
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Autogenerated input type of UpdateChatroom */
export type UpdateChatroomInput = {
  callerPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  natureCodeId?: InputMaybe<Scalars['ID']['input']>;
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Autogenerated return type of UpdateChatroom. */
export type UpdateChatroomPayload = {
  __typename?: 'UpdateChatroomPayload';
  chatroom: Chatroom;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type ChatroomDataFragment = { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomnotes?: Array<{ __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any }> | null };

export type ChatroomnoteDataFragment = { __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any };

export type NatureCodeDataFragment = { __typename?: 'NatureCode', id: string, name: string };

export type CreateChatroomMutationVariables = Exact<{
  label: Scalars['String']['input'];
  callerPhoneNumber: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  natureCodeId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateChatroomMutation = { __typename?: 'Mutation', createChatroom?: { __typename?: 'CreateChatroomPayload', chatroom: { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomnotes?: Array<{ __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any }> | null } } | null };

export type CreateChatroomnotesMutationVariables = Exact<{
  note: Scalars['String']['input'];
  chatroomId: Scalars['ID']['input'];
}>;


export type CreateChatroomnotesMutation = { __typename?: 'Mutation', createChatroomnotes?: { __typename?: 'CreateChatroomnotesPayload', chatroomnote: { __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any } } | null };

export type DeleteChatroomnotesMutationVariables = Exact<{
  chatroomnoteId: Scalars['ID']['input'];
  chatroomId: Scalars['ID']['input'];
}>;


export type DeleteChatroomnotesMutation = { __typename?: 'Mutation', deleteChatroomnotes?: { __typename?: 'DeleteChatroomnotesPayload', result: boolean } | null };

export type UpdateChatroomMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  callerPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
  natureCodeId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UpdateChatroomMutation = { __typename?: 'Mutation', updateChatroom?: { __typename?: 'UpdateChatroomPayload', chatroom: { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomnotes?: Array<{ __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any }> | null } } | null };

export type ArchivedChatroomsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ArchivedChatroomsListQuery = { __typename?: 'Query', chatrooms: Array<{ __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomnotes?: Array<{ __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any }> | null }> };

export type ChatroomWithNotesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ChatroomWithNotesQuery = { __typename?: 'Query', chatroom: { __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomnotes?: Array<{ __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any }> | null } };

export type ChatroomsListQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatroomsListQuery = { __typename?: 'Query', chatrooms: Array<{ __typename?: 'Chatroom', id: string, label: string, description?: string | null, callerPhoneNumber: string, resolved: boolean, natureCode?: { __typename?: 'NatureCode', id: string, name: string } | null, chatroomnotes?: Array<{ __typename?: 'ChatroomnoteTypes', id: string, note: string, createdAt: any, updatedAt: any }> | null }> };

export type NatureCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type NatureCodesQuery = { __typename?: 'Query', natureCodes: Array<{ __typename?: 'NatureCode', id: string, name: string }> };

export const NatureCodeDataFragmentDoc = gql`
    fragment NatureCodeData on NatureCode {
  id
  name
}
    `;
export const ChatroomnoteDataFragmentDoc = gql`
    fragment ChatroomnoteData on ChatroomnoteTypes {
  id
  note
  createdAt
  updatedAt
}
    `;
export const ChatroomDataFragmentDoc = gql`
    fragment ChatroomData on Chatroom {
  id
  label
  description
  callerPhoneNumber
  resolved
  natureCode {
    ...NatureCodeData
  }
  chatroomnotes {
    ...ChatroomnoteData
  }
}
    ${NatureCodeDataFragmentDoc}
${ChatroomnoteDataFragmentDoc}`;
export const CreateChatroomDocument = gql`
    mutation CreateChatroom($label: String!, $callerPhoneNumber: String!, $description: String, $natureCodeId: ID) {
  createChatroom(
    input: {label: $label, callerPhoneNumber: $callerPhoneNumber, description: $description, natureCodeId: $natureCodeId}
  ) {
    chatroom {
      ...ChatroomData
    }
  }
}
    ${ChatroomDataFragmentDoc}`;
export type CreateChatroomMutationFn = Apollo.MutationFunction<CreateChatroomMutation, CreateChatroomMutationVariables>;

/**
 * __useCreateChatroomMutation__
 *
 * To run a mutation, you first call `useCreateChatroomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatroomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatroomMutation, { data, loading, error }] = useCreateChatroomMutation({
 *   variables: {
 *      label: // value for 'label'
 *      callerPhoneNumber: // value for 'callerPhoneNumber'
 *      description: // value for 'description'
 *      natureCodeId: // value for 'natureCodeId'
 *   },
 * });
 */
export function useCreateChatroomMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatroomMutation, CreateChatroomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatroomMutation, CreateChatroomMutationVariables>(CreateChatroomDocument, options);
      }
export type CreateChatroomMutationHookResult = ReturnType<typeof useCreateChatroomMutation>;
export type CreateChatroomMutationResult = Apollo.MutationResult<CreateChatroomMutation>;
export type CreateChatroomMutationOptions = Apollo.BaseMutationOptions<CreateChatroomMutation, CreateChatroomMutationVariables>;
export const CreateChatroomnotesDocument = gql`
    mutation CreateChatroomnotes($note: String!, $chatroomId: ID!) {
  createChatroomnotes(input: {note: $note, chatroomId: $chatroomId}) {
    chatroomnote {
      ...ChatroomnoteData
    }
  }
}
    ${ChatroomnoteDataFragmentDoc}`;
export type CreateChatroomnotesMutationFn = Apollo.MutationFunction<CreateChatroomnotesMutation, CreateChatroomnotesMutationVariables>;

/**
 * __useCreateChatroomnotesMutation__
 *
 * To run a mutation, you first call `useCreateChatroomnotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatroomnotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatroomnotesMutation, { data, loading, error }] = useCreateChatroomnotesMutation({
 *   variables: {
 *      note: // value for 'note'
 *      chatroomId: // value for 'chatroomId'
 *   },
 * });
 */
export function useCreateChatroomnotesMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatroomnotesMutation, CreateChatroomnotesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatroomnotesMutation, CreateChatroomnotesMutationVariables>(CreateChatroomnotesDocument, options);
      }
export type CreateChatroomnotesMutationHookResult = ReturnType<typeof useCreateChatroomnotesMutation>;
export type CreateChatroomnotesMutationResult = Apollo.MutationResult<CreateChatroomnotesMutation>;
export type CreateChatroomnotesMutationOptions = Apollo.BaseMutationOptions<CreateChatroomnotesMutation, CreateChatroomnotesMutationVariables>;
export const DeleteChatroomnotesDocument = gql`
    mutation DeleteChatroomnotes($chatroomnoteId: ID!, $chatroomId: ID!) {
  deleteChatroomnotes(
    input: {chatroomnoteId: $chatroomnoteId, chatroomId: $chatroomId}
  ) {
    result
  }
}
    `;
export type DeleteChatroomnotesMutationFn = Apollo.MutationFunction<DeleteChatroomnotesMutation, DeleteChatroomnotesMutationVariables>;

/**
 * __useDeleteChatroomnotesMutation__
 *
 * To run a mutation, you first call `useDeleteChatroomnotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChatroomnotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChatroomnotesMutation, { data, loading, error }] = useDeleteChatroomnotesMutation({
 *   variables: {
 *      chatroomnoteId: // value for 'chatroomnoteId'
 *      chatroomId: // value for 'chatroomId'
 *   },
 * });
 */
export function useDeleteChatroomnotesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChatroomnotesMutation, DeleteChatroomnotesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChatroomnotesMutation, DeleteChatroomnotesMutationVariables>(DeleteChatroomnotesDocument, options);
      }
export type DeleteChatroomnotesMutationHookResult = ReturnType<typeof useDeleteChatroomnotesMutation>;
export type DeleteChatroomnotesMutationResult = Apollo.MutationResult<DeleteChatroomnotesMutation>;
export type DeleteChatroomnotesMutationOptions = Apollo.BaseMutationOptions<DeleteChatroomnotesMutation, DeleteChatroomnotesMutationVariables>;
export const UpdateChatroomDocument = gql`
    mutation UpdateChatroom($id: ID!, $label: String, $callerPhoneNumber: String, $description: String, $resolved: Boolean, $natureCodeId: ID) {
  updateChatroom(
    input: {id: $id, label: $label, callerPhoneNumber: $callerPhoneNumber, description: $description, resolved: $resolved, natureCodeId: $natureCodeId}
  ) {
    chatroom {
      ...ChatroomData
    }
  }
}
    ${ChatroomDataFragmentDoc}`;
export type UpdateChatroomMutationFn = Apollo.MutationFunction<UpdateChatroomMutation, UpdateChatroomMutationVariables>;

/**
 * __useUpdateChatroomMutation__
 *
 * To run a mutation, you first call `useUpdateChatroomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatroomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChatroomMutation, { data, loading, error }] = useUpdateChatroomMutation({
 *   variables: {
 *      id: // value for 'id'
 *      label: // value for 'label'
 *      callerPhoneNumber: // value for 'callerPhoneNumber'
 *      description: // value for 'description'
 *      resolved: // value for 'resolved'
 *      natureCodeId: // value for 'natureCodeId'
 *   },
 * });
 */
export function useUpdateChatroomMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChatroomMutation, UpdateChatroomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChatroomMutation, UpdateChatroomMutationVariables>(UpdateChatroomDocument, options);
      }
export type UpdateChatroomMutationHookResult = ReturnType<typeof useUpdateChatroomMutation>;
export type UpdateChatroomMutationResult = Apollo.MutationResult<UpdateChatroomMutation>;
export type UpdateChatroomMutationOptions = Apollo.BaseMutationOptions<UpdateChatroomMutation, UpdateChatroomMutationVariables>;
export const ArchivedChatroomsListDocument = gql`
    query ArchivedChatroomsList {
  chatrooms(resolved: true) {
    ...ChatroomData
  }
}
    ${ChatroomDataFragmentDoc}`;

/**
 * __useArchivedChatroomsListQuery__
 *
 * To run a query within a React component, call `useArchivedChatroomsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArchivedChatroomsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArchivedChatroomsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useArchivedChatroomsListQuery(baseOptions?: Apollo.QueryHookOptions<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>(ArchivedChatroomsListDocument, options);
      }
export function useArchivedChatroomsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>(ArchivedChatroomsListDocument, options);
        }
export type ArchivedChatroomsListQueryHookResult = ReturnType<typeof useArchivedChatroomsListQuery>;
export type ArchivedChatroomsListLazyQueryHookResult = ReturnType<typeof useArchivedChatroomsListLazyQuery>;
export type ArchivedChatroomsListQueryResult = Apollo.QueryResult<ArchivedChatroomsListQuery, ArchivedChatroomsListQueryVariables>;
export const ChatroomWithNotesDocument = gql`
    query ChatroomWithNotes($id: ID!) {
  chatroom(id: $id) {
    ...ChatroomData
  }
}
    ${ChatroomDataFragmentDoc}`;

/**
 * __useChatroomWithNotesQuery__
 *
 * To run a query within a React component, call `useChatroomWithNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatroomWithNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatroomWithNotesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChatroomWithNotesQuery(baseOptions: Apollo.QueryHookOptions<ChatroomWithNotesQuery, ChatroomWithNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatroomWithNotesQuery, ChatroomWithNotesQueryVariables>(ChatroomWithNotesDocument, options);
      }
export function useChatroomWithNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatroomWithNotesQuery, ChatroomWithNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatroomWithNotesQuery, ChatroomWithNotesQueryVariables>(ChatroomWithNotesDocument, options);
        }
export type ChatroomWithNotesQueryHookResult = ReturnType<typeof useChatroomWithNotesQuery>;
export type ChatroomWithNotesLazyQueryHookResult = ReturnType<typeof useChatroomWithNotesLazyQuery>;
export type ChatroomWithNotesQueryResult = Apollo.QueryResult<ChatroomWithNotesQuery, ChatroomWithNotesQueryVariables>;
export const ChatroomsListDocument = gql`
    query ChatroomsList {
  chatrooms {
    ...ChatroomData
  }
}
    ${ChatroomDataFragmentDoc}`;

/**
 * __useChatroomsListQuery__
 *
 * To run a query within a React component, call `useChatroomsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatroomsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatroomsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useChatroomsListQuery(baseOptions?: Apollo.QueryHookOptions<ChatroomsListQuery, ChatroomsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatroomsListQuery, ChatroomsListQueryVariables>(ChatroomsListDocument, options);
      }
export function useChatroomsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatroomsListQuery, ChatroomsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatroomsListQuery, ChatroomsListQueryVariables>(ChatroomsListDocument, options);
        }
export type ChatroomsListQueryHookResult = ReturnType<typeof useChatroomsListQuery>;
export type ChatroomsListLazyQueryHookResult = ReturnType<typeof useChatroomsListLazyQuery>;
export type ChatroomsListQueryResult = Apollo.QueryResult<ChatroomsListQuery, ChatroomsListQueryVariables>;
export const NatureCodesDocument = gql`
    query NatureCodes {
  natureCodes {
    id
    name
  }
}
    `;

/**
 * __useNatureCodesQuery__
 *
 * To run a query within a React component, call `useNatureCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNatureCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNatureCodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNatureCodesQuery(baseOptions?: Apollo.QueryHookOptions<NatureCodesQuery, NatureCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NatureCodesQuery, NatureCodesQueryVariables>(NatureCodesDocument, options);
      }
export function useNatureCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NatureCodesQuery, NatureCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NatureCodesQuery, NatureCodesQueryVariables>(NatureCodesDocument, options);
        }
export type NatureCodesQueryHookResult = ReturnType<typeof useNatureCodesQuery>;
export type NatureCodesLazyQueryHookResult = ReturnType<typeof useNatureCodesLazyQuery>;
export type NatureCodesQueryResult = Apollo.QueryResult<NatureCodesQuery, NatureCodesQueryVariables>;