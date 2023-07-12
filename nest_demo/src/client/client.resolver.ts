import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientType } from './client.type';

@Resolver('Client')
export class ClientResolver {
  constructor(private readonly clientservice: ClientService) {}

  @Query((returns) => [ClientType])
  async getAllClients() {
    return await this.clientservice.getClients();
  }

  @Query((returns) => ClientType)
  getSingle(@Args('id') id: string) {
    return this.clientservice.getSingleClient(id);
  }

  @Mutation((returns) => ClientType)
  createClient(@Args('name') name: string, @Args('email') email: string) {
    const clientData = { name, email };
    return this.clientservice.createClient(clientData);
  }

  @Mutation((returns) => ClientType)
  updateClient(
    @Args('id') id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {
    return this.clientservice.updateClientDetails(id, name, email);
  }

  @Mutation((returns) => ClientType)
  deleteClient(@Args('id') id: string) {
    return this.clientservice.deleteClient(id);
  }
}
