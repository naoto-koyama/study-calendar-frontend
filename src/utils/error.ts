// src/utils/error.ts

import { errorMessages } from './errorMap';

export interface ErrorDetail {
  attribute: string;
  code: string;
  message?: string;
}

interface GraphQLErrorResponse {
  errors: ErrorDetail[];
}

interface NetworkError {
  result: GraphQLErrorResponse;
}

export interface CustomApolloError {
  networkError?: NetworkError;
}

export interface FormattedError {
  attribute: string;
  messages: string[];
}

export const defaultFormattedErrors: FormattedError[] = [
  { attribute: '', messages: [] },
];

const formatErrorMessage = (error: ErrorDetail): string => {
  const { attribute, code } = error;

  if (
    errorMessages[attribute] &&
    typeof errorMessages[attribute] === 'object'
  ) {
    const attributeMessages = errorMessages[attribute] as Record<
      string,
      string
    >;
    if (attributeMessages[code]) {
      return attributeMessages[code];
    }
  }

  if (typeof errorMessages[code] === 'string') {
    return errorMessages[code] as string;
  }

  return error.message || 'エラーが発生しました。';
};

/**
 * カスタムApolloErrorからエラーメッセージを抽出し、属性ごとにグループ化します。
 * @param error カスタムApolloErrorオブジェクト。
 * @returns 属性ごとにグループ化されたフォーマット済みエラーメッセージの配列。
 */
export const extractErrorMessages = (
  error: CustomApolloError
): FormattedError[] => {
  const errorResponse = error.networkError?.result;

  if (errorResponse && errorResponse.errors) {
    const groupedErrors: Record<string, string[]> = {};

    errorResponse.errors.forEach((err: ErrorDetail) => {
      const message = formatErrorMessage(err);
      if (groupedErrors[err.attribute]) {
        groupedErrors[err.attribute].push(message);
      } else {
        groupedErrors[err.attribute] = [message];
      }
    });

    return Object.keys(groupedErrors).map((attribute) => ({
      attribute,
      messages: groupedErrors[attribute],
    }));
  }

  return [{ attribute: 'unknown', messages: ['不明なエラーが発生しました。'] }];
};
