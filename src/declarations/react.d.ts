/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from '@types/react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
