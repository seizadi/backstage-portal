/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import {Table, TableColumn, Progress, useApi} from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { ***REMOVED***ApiRef, ***REMOVED***Applications } from '../../api';

type DenseTableProps = {
  applications: ***REMOVED***Applications;
};

export const DenseTable = ( { applications }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Id', field: 'id' },
    { title: 'Name', field: 'name' },
  ];

  console.log(applications);

  const data = applications.map(application => {
    return {
      id: application.id,
      name: application.name,
    };
  });

  return (
    <Table
      title="Example Application List (fetching data from ***REMOVED*** Server)"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const ***REMOVED***FetchComponent = () => {
  const api = useApi(***REMOVED***ApiRef);

  const { value, loading, error } = useAsync(async () => {
    return await api.getApplications();
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable applications={value || []} />;
};
