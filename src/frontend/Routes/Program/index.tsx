import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import H1 from '../../component/font/H1';
import H3 from '../../component/font/H3';
import P from '../../component/font/P';
import ST from '../../component/font/SmallText';
import Circle from '../../component/Circle';
import Card from '../../component/Card';

type ProgramProps = {};

const Program = () => {
  const { id } = useParams();
  const PROGRAM_QUERY = gql`
    query GetProgram($id: ID!) {
      program(where: { id: $id }) {
        description
        difficulty
        focus
        duration
        id
        image {
          url
        }
        name
        workouts {
          id
          name
          duration
          category
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(PROGRAM_QUERY, {
    variables: { id },
  });
  if (loading) return <p className="text-light text-center">loading ...</p>;
  if (error) return <p className="text-light text-center">error :/ </p>;
  const backgroundImage = {
    backgroundImage: `url(${data.program.image.url})`,
    height: '70vh',
    backgroundSize: 'cover',
  };
  const workoutOverview = data.program.workouts.map((workout) => {
    return (
      <Card key={workout.id}>
        <H3>{workout.name}</H3>
        <ST>
          {workout.duration} · {workout.category}
        </ST>
      </Card>
    );
  });
  return (
    <>
      <header>
        <section
          className="flex flex-col justify-end items-center px-5 text-center"
          style={backgroundImage}
        >
          <H1>{data.program.name}</H1>
          <div className="flex justify-around w-full items-end pb-5 h-1/2">
            <div className="flex flex-col items-center gap-y-2">
              <Circle className="w-8 h-8 bg-gradient-to-br from-gradient1A to-gradient1B" />
              <ST>{data.program.focus}</ST>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Circle className="w-8 h-8 bg-gradient-to-br from-gradient2A to-gradient2B" />
              <ST>{data.program.difficulty}</ST>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Circle className="w-8 h-8 bg-gradient-to-br from-gradient3A via-gradient3B to-gradient3C" />
              <ST>{data.program.duration} weeks</ST>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className="px-5 py-5 bg-medium">
          <P>{data.program.description}</P>
        </section>
        <section className="px-5 py-5">
          <H3>So ist das Programm aufgeteilt:</H3>
        </section>
        <section className="px-5 py-5">
          <div className="flex justify-between items-center">
            <H3>{data.program.duration} Weeks</H3>
            <ST>Alle anzeigen</ST>
          </div>
          <div className=" flex flex-col gap-y-2">{workoutOverview}</div>
        </section>
      </main>
    </>
  );
};

export default Program;
