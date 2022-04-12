import { CompanyRepresentative, CompanyRepresentativeCreate } from '@graduates/api/company-representative/api/shared/data-access';
import { ApiCompanyRepresentativeService } from '@graduates/api/company-representative/service/feature';
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver()
export class ApiCompanyRepresentativeResolver {
    constructor(private companyrepService: ApiCompanyRepresentativeService) {}

  @Query((returns) => CompanyRepresentative)
  async companyrepresentative(@Args('id') id: string): Promise<CompanyRepresentative> {
    const resp = await this.companyrepService.findOneById(id);
    if (!resp) {
      throw new NotFoundException(id);
    }
    return resp;
  }

  @Query((returns) =>CompanyRepresentative)
  async companyrepresentatives(): Promise<CompanyRepresentative[]> {
    const resp = await this.companyrepService.findAll();
    if (!resp) {
      throw new NotFoundException();
    }
    return resp;
  }

  @Query((returns) => Boolean)
  async deleteCompanyrepresentative(@Args('id') id: string): Promise<boolean> {
    const resp = await this.companyrepService.remove(id)
    if (!resp) {
      throw new NotFoundException();
    }
    return resp;
  }

  @Mutation((returns) => CompanyRepresentative)
  async editCompanyrep(@Args('newCompanyrepData') updatedCompanyrepData: CompanyRepresentativeCreate): Promise<CompanyRepresentativeCreate> {
    const resp = await this.companyrepService.edit(updatedCompanyrepData);
    pubSub.publish('company representative edited', { companyrepEdited: resp });
    return resp;
  }

  @Mutation((returns) => CompanyRepresentative)
  async addCompanyrep(
    @Args('newCompanyrepData') newCompanyrepData: CompanyRepresentativeCreate
  ): Promise<CompanyRepresentativeCreate> {
    const resp = await this.companyrepService.create(newCompanyrepData);
    pubSub.publish('new company representative added', { companyrepAdded: resp });
    return resp;
  }
}
