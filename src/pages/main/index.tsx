import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'src/shared/components/input';
import Button from 'src/shared/components/button';
import { POSTCODE } from 'src/shared/constant/restaurant';

import { Container, PostcodeGrid, PostcodeButton, SearchForm, Description } from './styled';

export default function Main() {
  const [postcode, setPostcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      navigate(`/restaurant/${postcode.trim()}`);
    }
  };

  const handlePostcodeClick = (selectedPostcode: string) => {
    setPostcode(selectedPostcode);
  };

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
        />
        <Button type="submit">Search</Button>
      </SearchForm>

      <Description>You could select one postcode from the list below.</Description>
      <PostcodeGrid>
        {POSTCODE.map((code) => (
          <PostcodeButton key={code} type="button" onClick={() => handlePostcodeClick(code)}>
            {code}
          </PostcodeButton>
        ))}
      </PostcodeGrid>
    </Container>
  );
}
